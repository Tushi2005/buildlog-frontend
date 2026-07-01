export default function FeedPost({ projectName,imgUrl }: { projectName: string, imgUrl:string }
) {
  return <>
    <h2>{projectName}</h2>
    <img src={imgUrl} alt=""/>
    <label htmlFor="">Phaseses</label>
    <ul>
      <li>Phase1</li>
      <li>Phase2</li>
    </ul>
    <button>Like</button>
  </>
}