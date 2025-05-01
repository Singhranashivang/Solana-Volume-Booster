const Alert = ({
    children,
    type = 'error',
    nonce
  }: {
    children: React.ReactNode
    type?: 'error' | 'warning' | 'info'
    nonce?: string
  }) => {
    const colors = {
      error: 'bg-red-100 border-red-400 text-red-700',
      warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
      info: 'bg-blue-100 border-blue-400 text-blue-700'
    }
  
    return (
      <div
        className={`${colors[type]} border px-4 py-3 rounded relative`}
        role="alert"
        nonce={nonce}
      >
        {children}
      </div>
    )
  }
  
  export default Alert