import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useUser } from "../context/user-context";
import { useSocket } from "../providers/socket-provider";
import { Quiz } from "./Quiz";

export const QuizRoom = () => {
    const [quizIndex, setQuizIndex] = useState(0);
    const location = useLocation();
    const roomId = location.state?.roomId
    const navigate = useNavigate()
    const { socket } = useSocket()
    const { user } = useUser();
    const quizes = [
        {
            id: 1,
            question: "What is the name of the first computer programmer?",
            options: ["Ada Lovelace", "Grace Hopper", "Grace Murray Hopper", "Alan Turing"],
            answer: "Ada Lovelace"
        },
        {
            id: 2,
            question: "Which is not an individual who contributed to the development of the first computer?",
            options: ["Ada Lovelace", "Grace Hopper", "Grace Murray Hopper", "Alan Turing"],
            answer: "Grace Murray Hopper"
        },
        {
            id: 3,
            question: "Which one is not an indian cricketer?",
            options: ["steave smith", "Sachin Tendulkar", "Rahul Dravid", "Virat Kohli"],
            answer: "steave smith"
        }
    ]
    useEffect(() => {
        if (!roomId) {
            navigate("/")
        }
        const handleQuizAnswer = ({ answer, userName }: { answer: string, userName: string }) => {
            console.log("user " + userName + " answered " + answer);
        }

        socket?.on("quiz answer", handleQuizAnswer)

        socket?.on("next quiz", ({ setIndex }) => {
            setQuizIndex(setIndex)
        })
        return () => {
            socket?.off("quiz answer", handleQuizAnswer);
        }
    }, [socket])


    const handleChange = (e: any, id: number) => {
        const answer = e.target.value;
        if (socket) {
            socket.emit("quiz answer", { userName: user.userName, roomId, answer, quizId: id })
        }
    }

    function handleCurrentQuiz() {
        const quizSize = quizes.length - 1;
        if (quizIndex < quizSize) {
            socket?.emit("next quiz", { roomId, setIndex: quizIndex + 1 })
            setQuizIndex(quizIndex + 1);
        }
    }

    if (roomId) {
        return <div className="flex flex-col gap-4 items-start mt-40 max-w-xl">
            <Quiz quiz={quizes[quizIndex]} handleChange={handleChange} />
            <div>
                {quizIndex < quizes.length - 1 && <button className="bg-black px-4 py-2 hover:bg-black/80 rounded-md text-white" onClick={handleCurrentQuiz}>Next</button>}
            </div>
        </div>
    }
    return null;
}