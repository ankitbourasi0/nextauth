
export default function LoginPage() {
    return (
        <div>

            <form action="./api/data" method="post">

                <label htmlFor="name">login Name </label>
                <input type="text" name="name" id="name" />


                <label htmlFor="age"> Enter Age </label>
                <input type="text" name="age" id="age" />

                <input type="submit" value="submit" />

            </form>
        </div>
        )
}