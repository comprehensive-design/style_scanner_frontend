export default function CommentBox({
  commentId,
  feedImg,
  title,
  content,
  date,
  onDelete,
  onEdit,
}) {
  return (
    <div className="mppWritingBox mb3">
      <div>
        <img className="mppFeedImage borderRad" src={feedImg}></img>
      </div>
      <div className="mt3 ml3 left">
        <p className="subtitle mb1">{title}</p>
        <p className="caption">{content}</p>
      </div>
      {/* <div className="mpcDate">
        <p>{date}205938</p>
      </div> */}
      <div className="mppButtonDiv">
        <button className="whiteButton" onClick={() => onDelete(commentId)}>
          삭제
        </button>
      </div>
    </div>
  );
}
