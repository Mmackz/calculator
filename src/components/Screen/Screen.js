function Screen({ display, subdisplay }) {
   return (
      <div className="screen-container">
         {subdisplay && <div className="subdisplay">{subdisplay}</div>}
         <div className="display">{display}</div>
      </div>
   );
}

export default Screen;
