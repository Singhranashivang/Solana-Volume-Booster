// src/components/CSPErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react'
import Alert from './Alert'

interface CSPErrorBoundaryProps {
  children: ReactNode
  nonce?: string  // Make sure this matches what you're passing
}

interface State {
  hasError: boolean
  error?: Error
}

class CSPErrorBoundary extends Component<CSPErrorBoundaryProps, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CSP Violation:', { error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div nonce={this.props.nonce}>
          <Alert type="error">
            <h2 className="text-xl font-bold">Security Restriction</h2>
            <p>This action was blocked by content security policy.</p>
            {this.state.error && (
              <details className="mt-2 text-sm">
                <summary>Technical Details</summary>
                <pre className="whitespace-pre-wrap">{this.state.error.message}</pre>
              </details>
            )}
          </Alert>
        </div>
      )
    }

    return this.props.children
  }
}

export default CSPErrorBoundary