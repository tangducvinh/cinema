function Trailer({ keyFrame, onClick }) {
  return (
    <div
      className="fixed top-0 left-0 z-30  w-screen h-screen bg-black bg-opacity-35"
      onClick={onClick}
    >
      <iframe
        className="w-3/4 h-4/5 object-cover absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        src={`https://www.youtube.com/embed/${keyFrame}?si=gIeUf1BUQue2w6dB&autoplay=1&mute`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default Trailer;
