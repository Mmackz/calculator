function Screen({ display, subdisplay }) {
   return (
      <div className="screen-container">
         <div className="screen-inner">
            <div className="subdisplay">{subdisplay}</div>
            <div className="display">{display}</div>
         </div>
      </div>
   );
}

export default Screen;
