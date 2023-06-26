import React, {
  createRef,
  useContext,
  useEffect,
  useState,
} from "react";
import SplitPaneContext from "./SplitPaneContext";

const SplitPane = ({ children, ...props }) => {
  const [clientHeight, setClientHeight] = useState(null);
  const [clientWidth, setClientWidth] = useState(null);

  return (
    <div {...props}>
      <SplitPaneContext.Provider
        value={{
          clientHeight,
          setClientHeight,
          clientWidth,
          setClientWidth,
        }}
      >
        {children}
      </SplitPaneContext.Provider>
    </div>
  );
};

export const SplitPaneTop = (props) => {
  const topRef = createRef();
  const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

  useEffect(() => {
    if (!clientHeight) {
      setClientHeight(topRef.current.clientHeight);
      setClientWidth(topRef.current.clientWidth / 2.2);
      return;
    }

    topRef.current.style.minHeight = clientHeight + "px";
    topRef.current.style.maxHeight = clientHeight + "px";
    topRef.current.style.minWidth = clientWidth + "px";
    topRef.current.style.maxWidth = clientWidth + "px";
  }, [clientHeight]);

  return (
    <div className="split-pane-top" ref={topRef} style={clientWidth < 400 ? { fontSize: 'x-small' } : { fontSize: 'large' }}>
      <table>
        {props.movieData.map((el, i) => {
          return (
            <tr>
              <td>Episode {el.episode_id}</td>
              <td style={{ padding: '2%' }}>
                <a href="#" onClick={() => props.setCurrMovie(el.episode_id)}>
                  Episode {el.episode_id} - {el.title}
                </a>
              </td>
              <td style={{ padding: '2%' }}>{el.release_date}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export const Divider = (props) => {
  return <div {...props} />;
};

export const SplitPaneLeft = (props) => {
  const topRef = createRef();
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

  useEffect(() => {
    if (!clientWidth) {
      setClientWidth(topRef.current.clientWidth);
      return;
    }

    topRef.current.style.minWidth = clientWidth + "px";
    topRef.current.style.maxWidth = clientWidth + "px";
  }, [clientWidth]);

  return <div {...props} className="split-pane-left" ref={topRef} />;
};

export const SplitPaneRight = (props) => {
  const { movieData, currMovie } = props
  const screenWidth = window.screen.width;
  const movie = movieData.find((el) => el.episode_id === currMovie);

  return (
    <div {...props} className="split-pane-right" style={screenWidth < 400 ? { fontSize: 'x-small' } : { fontSize: 'large' }}>
      {movie ?
        <React.Fragment>
          <div style={{ margin: '5%' }}>
            Episode {movie.episode_id} - {movie.title}
          </div>
          <div style={{ margin: '5%' }}>
            {movie.opening_crawl}
          </div>
          <div style={{ margin: '5%' }}>
            Directed by : {movie.director}
          </div>
        </React.Fragment>
        :
        <React.Fragment>
          <div style={{ margin: '5%' }}>
            IMPORTANT!
          </div>
          <p style={{ margin: '5%' }}>
            This is a default text being shown when no episode/movie is clicked.
          </p>
        </React.Fragment>
      }
    </div>
  );
};

export default SplitPane;
