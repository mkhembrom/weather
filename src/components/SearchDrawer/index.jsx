import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Button,
    Flex,
    InputLeftElement,
    InputGroup,
    Text,
    Box,
    useColorMode,
} from "@chakra-ui/react"
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';

import React, { useContext, useState } from "react";
import { SearchContext } from "../../context/searchContext";

const SearchDrawer = ({ isOpen, onClose, btnRef }) => {
    
    const { colorMode } = useColorMode();

    const { dispatch, history } = useContext(SearchContext);
    const { itemList } = history;
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleClick = () => {
        if (text === "") {
            return;
        }
        dispatch({ type: "ADD_SEARCH_KEY", payload: text });
        onClose();
        setText("");
    }

    const handleSearchClick = (id) => {
        const item = itemList.filter(i => i.id === id);
        console.log("listofitems ", item, " & data ", item[0].data);
        dispatch({ type: "ADD_SEARCH_KEY", payload: item[0].data });
        dispatch({ type: "REMOVE_SEARCH_KEY", payload: id });
        onClose();
    }
  
    return (
       <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}       
      >
        <DrawerOverlay />
        <DrawerContent maxWidth={["100vw", "100vw","380px","380px","380px"]} bg={colorMode === "dark" ? "#1F203A" : "#C8C2BC"} >
          <DrawerCloseButton borderRadius="50%" fontSize="md"/>
            <DrawerBody mt={14}>
                <Flex alignItems="center" justifyContent="space-between">
                            <InputGroup mr="6px" borderRadius="2px" >
                                <InputLeftElement
                                    children={<FiSearch color="grey" />}
                                />
                                    <Input
                                        placeholder="search location"
                                        borderRadius="2px"
                                        onChange={handleChange}
                                        border={colorMode === "dark" ? "2px solid grey" : "2px solid #fff"}
                                        color={colorMode === "dark" ? "grey" : "#fff"}
                                        _focus={{
                                            border: `${colorMode === "dark" ? "2px solid #71DFE7" : "2px solid grey"}`,
                                        }}
                                        _placeholder={{
                                            color: `${colorMode === "dark" ? "grey" : "grey"}`,
                                        }}
                                        _hover={{
                                            borderColor: `${colorMode === "dark" ? "grey" : "#fff"}`,
                                        }}
                                    />
                            </InputGroup>
                    <Button borderRadius="2px" bg={colorMode === "dark" ? "#3D46E9" : "#FDFCE5"} fontSize="0.85rem" onClick={handleClick}>Search</Button>
                </Flex>
                    <Flex
                        mt={6}
                        flexDirection="column"
                        alignItems="center"
                        width="100%"
                        borderRadius="2px"
                    >     
                            {[...history.itemList].reverse().map(({id, data}) => (
                                <Flex key={id} justifyContent="space-between" alignItems="center" _hover={{
                                    transition: "all 0.3s ease",
                                    border: "1px solid grey"
                                    
                                }} onClick={() => handleSearchClick(id)} cursor="pointer" role="group" border="1px solid transparent" mb={2} w="100%"  p="14px 16px" >
                                <Text >{ data }</Text>
                                <Box color="transparent" _groupHover={{ color: "grey" }}>
                                    <IoIosArrowForward />
                                </Box>
                                </Flex>
                            ))}
                </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
    )
}

export default SearchDrawer
