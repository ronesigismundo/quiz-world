import { loadGetInitialProps } from 'next/dist/next-server/lib/utils'
import Head from 'next/head'


export default function headIndexPage(props) {
    return (
        <div>
            <Head>
                <title>Quiz World</title>
                <meta property="og:title" content="Quiz World" key="title" />
                <meta property="og:description" content="Uma aplicação feita na semana de imersão React da Alura e a cada dia ganha mais forma." key="description" />
                <meta property="og:image" content={props.image} key="image" />
            </Head>
        </div>
    )
}


