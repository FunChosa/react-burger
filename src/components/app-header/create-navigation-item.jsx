import style from "./app-header.module.css";
import cn from "classnames";
import PropTypes from "prop-types";

function CreateNavigationItem({ icon, text, inactiveTextColor }) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a className={cn("pt-4 pb-4 pr-5 pl-5", style.navigation__item)}>
      {icon}
      <p className={cn(inactiveTextColor && "text_color_inactive", "ml-2")}>
        {text}
      </p>
    </a>
  );
}

CreateNavigationItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  inactiveTextColor: PropTypes.bool.isRequired,
};

export default CreateNavigationItem;
