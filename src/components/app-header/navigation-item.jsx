import style from "./app-header.module.css";
import cn from "classnames";
import PropTypes from "prop-types";

function NavigationItem({ icon, text, inactiveTextColor }) {
  const textColor = inactiveTextColor ? "text_color_inactive" : "";
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a className={cn("pt-4 pb-4 pr-5 pl-5", style.navigation__item)}>
      {icon}
      <p className={cn(textColor, "ml-2")}>{text}</p>
    </a>
  );
}

NavigationItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  inactiveTextColor: PropTypes.bool.isRequired,
};

export default NavigationItem;
