interface SessionExpireModalProps {
    onLogin: () => void;
}

const SessionExpireModal = ({
    onLogin,
}: SessionExpireModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                <div className="mb-8">
                    <h2 className="mb-2 text-lg font-semibold text-gray-900">
                        Session Expired
                    </h2>

                    <p className="text-sm leading-6 text-gray-600">
                        Your session has expired. Please log in again to continue.
                    </p>
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onLogin}
                        className="rounded-lg bg-yellow-500 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-yellow-600"
                    >
                        Login
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SessionExpireModal;