import { createPortal } from "react-dom";

interface ConfirmationModalProps {
    title: string;
    confirmText?: string;
    cancelText?: string;
    data?: string[];
    dataLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal = ({
    title,
    confirmText = "Confirm",
    cancelText = "Cancel",
    data,
    dataLabel,
    onConfirm,
    onCancel,
}: ConfirmationModalProps) => {
    return createPortal(
        <div className="fixed inset-0 z-[1400] flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-6">
            <div className="my-auto max-h-[calc(100dvh-3rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-8">
                    <p className="text-lg text-gray-900">
                        {title}
                    </p>
                </div>

                {data && data.length > 0 && (
                    <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <p className="mb-3 text-sm font-semibold text-gray-700">
                            {dataLabel}
                        </p>

                        <div className="max-h-40 overflow-y-auto rounded-lg bg-white p-2">
                            <div className="space-y-2">
                                {data.map((item, index) => (
                                    <div
                                        key={`${item}-${index}`}
                                        className="rounded-md border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded-lg bg-yellow-500 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-yellow-600"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmationModal;