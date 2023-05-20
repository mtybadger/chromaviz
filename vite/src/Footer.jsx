import ButtonGroup from "./ButtonGroup"

const Footer = ({ settings }) => {
  return(
    <div className="footer">
      <ButtonGroup settings={settings} />
      <h4>chroma visualizer 0.0.1a</h4>
    </div>
  )
}

export default Footer
