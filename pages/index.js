import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";

const Home = () => {
    //destruct useForm
    const { register, handleSubmit } = useForm();

    //onSubmit method
    const submitEmailSendForm = async (data) => {
        try {
            const result = await fetch("http://localhost:5000/sendmail", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const sendEmail = await result.json();
            if (sendEmail.success) {
                console.log(sendEmail.success);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            {
                //this is head
            }
            <Head>
                <title>Node SparkPost Email Tutorial</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {
                //this is main form field to send email
            }
            <main className={styles.main}>
                <h1 className={styles.title}>Send An Email </h1>
                <form onSubmit={handleSubmit(submitEmailSendForm)}>
                    <input placeholder="Name" {...register("name")} />
                    <input placeholder="Email" {...register("email")} />
                    <input placeholder="Subject" {...register("subject")} />
                    <textarea
                        {...register("message")}
                        defaultValue="Message body"
                    ></textarea>
                    <input type="submit" value="send me a email now" />
                </form>
            </main>
        </div>
    );
};

export default Home;
