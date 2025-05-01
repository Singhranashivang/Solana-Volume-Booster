import { Connection, PublicKey, Transaction } from '@solana/web3.js'

const JUPITER_API_URL = 'https://quote-api.jup.ag/v6'

interface SwapParams {
  inputMint: PublicKey
  outputMint: PublicKey
  amount: number
  slippageBps: number
  user: PublicKey
}

export async function createJupiterSwap(
  connection: Connection,
  params: SwapParams
): Promise<Transaction> {
  try {
    // Add CSP header to requests
    const headers = new Headers()
    headers.append('Content-Security-Policy', "connect-src 'self' https://quote-api.jup.ag")

    const quoteResponse = await fetch(
      `${JUPITER_API_URL}/quote?${new URLSearchParams({
        inputMint: params.inputMint.toString(),
        outputMint: params.outputMint.toString(),
        amount: params.amount.toString(),
        slippageBps: params.slippageBps.toString()
      })}`,
      { headers }
    )

    if (!quoteResponse.ok) throw new Error(await quoteResponse.text())
    
    const swapResponse = await fetch(`${JUPITER_API_URL}/swap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Security-Policy': "connect-src 'self' https://quote-api.jup.ag"
      },
      body: JSON.stringify({
        quoteResponse: await quoteResponse.json(),
        userPublicKey: params.user.toString(),
        wrapAndUnwrapSol: true
      })
    })

    if (!swapResponse.ok) throw new Error(await swapResponse.text())
    
    return Transaction.from(
      Buffer.from((await swapResponse.json()).swapTransaction, 'base64')
    )
  } catch (error) {
    console.error('Jupiter swap error:', error)
    throw error
  }
}