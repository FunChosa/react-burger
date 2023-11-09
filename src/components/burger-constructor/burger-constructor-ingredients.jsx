import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd/dist/hooks";
import { useRef } from "react";
import style from "./burger-constructor.module.css";
import cn from "classnames";
import { ingredientType } from "../../utils/prop-types";
import PropTypes from "prop-types";

const BurgerConstructorIngredients = ({ item, index }) => {
  const dispatch = useDispatch();

  const handleClose = (item) => {
    dispatch({
      type: "DELETE_INGREDIENT",
      itemType: item.type,
      itemKey: item.key,
    });
    dispatch({
      type: "DECREASE_COUNTER",
      itemType: item.type,
      itemId: item._id,
    });
  };
  const moveListItem = (dragIndex, hoverIndex) => {
    dispatch({
      type: "FILTER_INGREDIENTS",
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (
        (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverActualY > hoverMiddleY)
      ) {
        moveListItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));
  const opacity = isDragging ? 0 : 1;

  return (
    <li
      className={cn(style.inside__item, "mb-4")}
      key={item.key}
      style={{ opacity }}
      ref={dragDropRef}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleClose(item)}
      />
    </li>
  );
};

BurgerConstructorIngredients.propTypes = {
  item: ingredientType.isRequired,
  index: PropTypes.number.isRequired,
};

export default BurgerConstructorIngredients;
