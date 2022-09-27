const fetchGetHelper = async (url:string) => {
    return await fetch(url).then(data => data.json());
}

export default fetchGetHelper;