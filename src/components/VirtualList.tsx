import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { FixedSizeList, ListChildComponentProps } from "react-window";

export interface VirtualListItem {
    id: string;
    title: string;
    [key:  string]: any
}

interface VirtualListProps {
    items: VirtualListItem[];
    height?: number;
    itemSize?: number;
    buttonText?: string;
    onItemClick?: (item: VirtualListItem) => void;
    maxWidth?: number | string;
}


export default function VirtualList({
    items,
    height = 400,
    itemSize = 60,
    buttonText = 'Start',
    onItemClick,
    maxWidth = "100%"
}: VirtualListProps) {
    function renderRow(props: ListChildComponentProps) {
        const { index, style } = props;
        const item = items[index];

        if(!item) return null;

        return (
            <ListItem
                style={style}
                key={index}
                component="div"
                disablePadding
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    borderBottom: "1px solid #e0e0e0",
                }}
            >
                <ListItemText primary={item.title} />
                <Button 
                    variant="contained"
                    size="small"
                    sx={{ml: 2}}
                    onClick={() => onItemClick?.(item)}
                >
                    
                    {buttonText}
                </Button>
                
                
            </ListItem>
        );
    }


    return (
        <Box
            sx={{
                width: "100%",
                height: height,
                maxWidth: maxWidth,
                bgcolor: "background.paper",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                overflow: 'hidden',
            }}
        >
            <FixedSizeList
                height={height}
                width={"100%"}
                itemSize={itemSize}
                itemCount={items.length}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}
