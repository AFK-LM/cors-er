import { NextApiRequest } from "next"


const handler = async (req, res) => {
    const { url } = req.query
    let final_url = ""
    let origin = false

    res.setHeader('Access-Control-Allow-Origin', '*')

    for (let index in url)  {
        let str = url[index]

        if (str.search("http") != -1)
            final_url+="http://"
        else if (str.search('.') != -1 && !origin) {
            final_url+=str
            origin=true
        }
        else if (origin)
            final_url+='/'+str
    }
    
    await fetch(final_url)
        .then(val => val.text())
        .then(txt => res.status(200).send(txt))
}

export default handler