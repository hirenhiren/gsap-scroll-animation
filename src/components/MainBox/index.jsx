import MainBoxStyle from '../MainBox/MainBox.module.scss';


const MainBox = ({ item, index, sectionRefs }) => {
  return (
    <section
      key={index}
      className={MainBoxStyle.section}
      ref={(el) => (sectionRefs.current[index] = el)}>
      <div className={MainBoxStyle.headLogo}>
        <h3>{item.title}</h3>
        <img src={item.smallImage} width="60" alt={item.title} />
      </div>
      <p>{item.description}</p>
      <a href={item.knowMore}>Know More</a>
    </section>
  );
};

export default MainBox;
