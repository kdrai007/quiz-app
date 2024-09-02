export const Notification = ({ message, type, status }: { message: string, type: "success" | "error", status: boolean }) => {
    if (status) {
        return <div className="w-full flex justify-end relative">
            <div className={`${type == "success" ? "bg-green-100" : "bg-red-100"} p-2 rounded-md mt-2 mr-2 absolute flex items-center gap-2`}>
                <p>{message}</p>
            </div>
        </div>
    }
    return null;
}
