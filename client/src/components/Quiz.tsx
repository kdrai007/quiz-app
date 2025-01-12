export const Quiz = ({ quiz, handleChange }: { quiz: any, handleChange: any }) => {
    return <div className="flex flex-col gap-4 items-start">
        <h2 className="text-2xl">{quiz.question}</h2>
        <div className="flex flex-col gap-2 items-start">{quiz.options.map((option: any, index: number) =>
            <div className="space-x-2" key={index}>
                <input id={'option-' + quiz.id + index} className="p-2" type="radio" name={quiz.question} value={option} onChange={(e) => handleChange(e, quiz.id)} />
                <label htmlFor={'option-' + quiz.id + index}>{option}</label>
            </div>
        )}
        </div>

    </div>
}