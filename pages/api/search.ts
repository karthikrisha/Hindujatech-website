// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import { forEachObjIndexed } from 'ramda';

export default async (req, res) => {
  const { _q } = req.query;
  console.log(req.query, _q, '_q');

  if(!_q || _q === undefined) {
    return res.status(400).json({
        isValid: false,
        error: "Invalid search"
    })
  }
  const keyword = _q?.trim()?.toLowerCase();

  if(keyword.length === 0) {
    return res.status(400).json({
        isValid: false,
        error: "Invalid search"
    })
  }
  //`${process.env.NEXT_PUBLIC_API_URL}/content-search?_q=${_q}`
  const {data: data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/content-search?_q=${_q}`
  );

  console.log(data);
  let result = [];
  if(data) {
    await forEachObjIndexed(d => {
      if(d !== 'injectedProperty')
        result.push(d)
    }, data);
  }


  res.status(200).json({ data: result })
}
