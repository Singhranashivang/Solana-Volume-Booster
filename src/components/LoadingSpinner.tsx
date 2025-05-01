const LoadingSpinner = ({ nonce }: { nonce?: string }) => {
    return (
      <div className="flex justify-center items-center h-screen" nonce={nonce}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }
  
  export default LoadingSpinner