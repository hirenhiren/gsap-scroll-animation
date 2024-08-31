import footerStyle from './Footer.module.scss';
const Footer = () =>{
    return(
      <div className={footerStyle.belowWrapper}>
        <div>
          <h2>Additional Content</h2>
          <p>
            This content should appear only after the horizontal scroll
            animation completes.
          </p>
        </div>
      </div>
       
    );
}

export default Footer