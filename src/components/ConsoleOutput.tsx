
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface LogEntry {
  id: number;
  type: "buy" | "sell" | "info" | "error";
  message: string;
  timestamp: Date;
}

interface ConsoleOutputProps {
  logs: LogEntry[];
}

const ConsoleOutput = ({ logs }: ConsoleOutputProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type: string) => {
    switch (type) {
      case "buy":
        return "text-green-400";
      case "sell":
        return "text-red-400";
      case "error":
        return "text-destructive";
      default:
        return "text-solana-cyan";
    }
  };

  const getLogPrefix = (type: string) => {
    switch (type) {
      case "buy":
        return "➕ BUY";
      case "sell":
        return "➖ SELL";
      case "error":
        return "❌ ERROR";
      default:
        return "ℹ️ INFO";
    }
  };

  return (
    <Card className="glass-panel p-4 w-full my-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-solana-purple">
          Transaction Logs
        </h2>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="bg-solana-darkest border border-solana-purple/20 rounded-md p-2">
        <ScrollArea className="h-[250px] w-full terminal-text" ref={scrollRef}>
          <div className="p-2 font-mono text-sm">
            <div className="text-solana-gray mb-2">
              {"> "} Terminal ready. Waiting for transactions...
            </div>
            {logs.map((log) => (
              <div key={log.id} className="mb-1 animate-fade-in">
                <span className="text-solana-gray-dark mr-2">
                  [{log.timestamp.toLocaleTimeString()}]
                </span>
                <span className={`font-medium ${getLogColor(log.type)}`}>
                  {getLogPrefix(log.type)}:
                </span>{" "}
                <span className="text-solana-gray-light">{log.message}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};

export default ConsoleOutput;
