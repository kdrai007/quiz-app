import { useLocation } from "react-router-dom";

import { useUser } from "../context/user-context";
import { useSocket } from "../providers/socket-provider";

export const QuizRoom = () => {
    const location = useLocation();
    const roomId = location.state?.roomId
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
    const handleChange = (e: any, id: number) => {
        const answer = e.target.value;
        if (socket) {
            socket.emit("quiz answer", { userName: user.userName, roomId, answer, quizId: id })
        }
    }
    return <div className="flex flex-col gap-4 items-start mt-40">
        {quizes.map((quiz, index) => <div key={index} className="flex flex-col gap-2 items-start">
            <h2 className="text-2xl">{quiz.question}</h2>
            {quiz.options.map((option, index) => <div className="space-x-2" key={index}>
                <input id={'option-' + quiz.id + index} className="p-2" type="radio" name={quiz.question} value={option} onChange={(e) => handleChange(e, quiz.id)} />
                <label htmlFor={'option-' + quiz.id + index}>{option}</label>
            </div>)}
        </div>)}
    </div>
}