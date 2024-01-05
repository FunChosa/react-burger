import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd/dist/hooks";
import { useRef } from "react";
import style from "./burger-constructor.module.css";
import cn from "classnames";
import { IIngredientType } from "../../utils/types";
import { useAppDispatch } from "../../hooks/useSelector-useDispatch";

const BurgerConstructorIngredients = ({
  item,
  index,
}: {
  item: IIngredientType;
  index: number;
}) => {
  const dispatch = useAppDispatch();

  const handleClose = (item: IIngredientType) => {
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
  const moveListItem = (dragIndex: number, hoverIndex: number) => {
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
    hover: (item: { index: number }, monitor: any) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current?.getBoundingClientRect() as DOMRect;
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

  const ref = useRef<HTMLLIElement>(null);
  dragRef(dropRef(ref));
  const opacity = isDragging ? 0 : 1;

  return (
    <li
      className={cn(style.inside__item, "mb-4")}
      key={item.key}
      style={{ opacity }}
      ref={ref}
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

export default BurgerConstructorIngredients;
