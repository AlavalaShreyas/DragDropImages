import React, { useState, useRef, useEffect } from 'react'

function DragDropImages({ data }) {

    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        setList(data);
    }, [setList, data])

    const dragItem = useRef();
    const dragItemNode = useRef();

    const startHandleDrag = (e, item) => {
        dragItemNode.current = e.target;
        dragItemNode.current.addEventListener('dragend', stopHandleDrag)
        dragItem.current = item;

        setTimeout(() => {
            setDragging(true);
        }, 0)
    }
    const enterHandleDrag = (e, targetItem) => {
        if (dragItemNode.current !== e.target) {
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList[targetItem.grpI].items.splice(targetItem.itemI, 0, newList[dragItem.current.grpI].items.splice(dragItem.current.itemI, 1)[0])
                dragItem.current = targetItem;
                localStorage.setItem('List', JSON.stringify(newList));
                return newList
            })
        }
    }
    const stopHandleDrag = (e) => {
        setDragging(false);
        dragItem.current = null;
        dragItemNode.current.removeEventListener('dragend', stopHandleDrag)
        dragItemNode.current = null;
    }
    const getStyles = (item) => {
        if (dragItem.current.grpI === item.grpI && dragItem.current.itemI === item.itemI) {
            return "dnd-item current"
        }
        return "dnd-item"
    }

    if (list) {
        return (
            <div className="drag-n-drop">
                {list.map((grp, grpI) => (
                    <div key={grp.title} onDragEnter={dragging && !grp.items.length ? (e) => enterHandleDrag(e, { grpI, itemI: 0 }) : null} className="dnd-group">
                        {grp.items.map((item, itemI) => (
                            <div draggable key={item} onDragStart={(e) => startHandleDrag(e, { grpI, itemI })} onDragEnter={dragging ? (e) => { enterHandleDrag(e, { grpI, itemI }) } : null} className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}>
                                <div><img src={item} width="284" height="150" alt="No images found" /></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    } else { return null }

}

export default DragDropImages;
