export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Logo */}
        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center mx-auto animate-pulse-slow">
          <div className="h-8 w-8 rounded-full bg-gray-900"></div>
        </div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-text-primary">FlashTrade</h2>
          <p className="text-text-secondary">Loading your trading experience...</p>
        </div>
        
        {/* Loading animation */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 bg-accent rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
