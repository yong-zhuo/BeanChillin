
export async function GET(req: Request) {
    const url = new URL(req.url);
    //get href from url
    const href = url.searchParams.get('url');

    if(!href) {
        return new Response('URL is required', {
            status: 400
        })
    }

    const response = await fetch(href);
    const data = await response.text();

    //get title tag from html
    const titleMatch = data.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : '';

    //get meta description from html
    const descMatch = data.match(/<meta name="description" content="(.*?)"/);
    const description = descMatch ? descMatch[1] : '';

    //get meta image from html
    const imageMatch = data.match(/<meta property="og:image" content="(.*?)"/);
    const image = imageMatch ? imageMatch[1] : '';


    return new Response(JSON.stringify({
        success: 1,
        meta: {
            title,
            description,
            image: {
                url: image,
            }
        }
    }))

}