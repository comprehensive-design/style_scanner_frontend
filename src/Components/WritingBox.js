const formatDate = (dateArray) => {
  const year = dateArray[0];
  const month = String(dateArray[1]).padStart(2, "0");
  const day = String(dateArray[2]).padStart(2, "0");
  const formDate = `${year}-${month}-${day}`;
  return formDate;
};

export default function WritingBox({
  postId,
  feedImg,
  commentCnt,
  title,
  date,
  onDelete,
  onEdit,
}) {
  return (
    <div className="mppWritingBox mb3">
      <div>
        <img className="mppFeedImage borderRad" src={feedImg}></img>
      </div>
      <div>
        <div className="mt3 ml3">
          <p className="subtitle">{title}</p>
        </div>
        <div className="mppCommentDiv">
          <img className="mppCommentImage" src={`img/reply.png`}></img>
          <p  style={{margin: '0 1rem'}}>{commentCnt}</p>
        </div>
      </div>
      <div className="mppDateDiv">
        <p className="caption grayText">{formatDate(date)}</p>
      </div>
      <div className="mppButtonDiv">
        <button className="whiteButton" onClick={() => onEdit(postId)}>
          수정
        </button>
        <button className="whiteButton" onClick={() => onDelete(postId)}>
          삭제
        </button>
      </div>
    </div>
  );
}
