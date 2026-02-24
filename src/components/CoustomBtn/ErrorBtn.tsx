import { AlertCircle, RefreshCcw } from "lucide-react";

interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
}

const ErrorMessage = ({
    message = "Something went wrong. Please try again.",
    onRetry
}: ErrorMessageProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-100 rounded-2xl">
            <div className="bg-red-100 p-3 rounded-full mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Authentication Error
            </h3>

            <p className="text-gray-600 text-center text-sm max-w-[250px] mb-6">
                {message}
            </p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-6 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-all text-sm font-bold shadow-sm"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
