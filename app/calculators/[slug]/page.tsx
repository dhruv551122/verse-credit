const Calculator = async ({params}: {params: {slug: string}}) => {
    const {slug} = await params
    return <div>Calculator {slug}</div>
}

export default Calculator