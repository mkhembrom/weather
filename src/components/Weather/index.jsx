import React, { useContext } from 'react';
import './weather.css';
import { 
    Box, 
    Button, 
    Circle,
    Flex,
    Heading,
    Image,
    Slider,
    SliderFilledTrack,
    SliderTrack,
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';
import {
    FaSun,
    FaMoon,
    FaLocationArrow
} from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import Cloud from '../../images/Cloud-background.png';
import SearchDrawer from '../SearchDrawer';
import {
    useQuery,
    gql
} from '@apollo/client';
import moment from 'moment';
import { SearchContext } from '../../context/searchContext';

const GET_WEATHER_DATA = gql`
    query GetLocWeather($name: String!) {
        getLocWeather(name: $name) {
            sun_rise
            timezone
            title
            consolidated_weather {
                applicable_date
                weather_state_abbr
                weather_state_name
                the_temp
                max_temp
                min_temp
                air_pressure
                visibility
                humidity
                wind_speed
            }
        }
    }
`;

export const Weather = () => {

    const { history } = useContext(SearchContext);
    const { itemList } = history;
    let inputText = "delhi";

    if (itemList.length) {
        inputText = itemList[itemList.length - 1].data;
    } else {
        inputText = "delhi";
    }

    const weatherDate = (date) => {
        let now = moment(date).format("ddd, D MMM");
        return now;
    }

    const mainBackground = useColorModeValue("#000", "#fff");
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    const { data, loading, error } = useQuery(GET_WEATHER_DATA, {
        variables: {
            name: inputText,
        }
    });
    if (loading) return <div className="bigBoxLoading"><div className="lds-ellipsis">
        <div></div><div></div><div></div><div></div></div></div>;
   
    if (error) {
        
        return (<>
        <Box
            d="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            width="100vw"
            fontSize="3xl"
        >ERROR : 404
        <Button ml={4}
        as="a"
                href="/"
                p="10px 18px"
                fontSize="2xl"
                color="#32C1CD"
                    textDecoration="none"
                    textTransform="uppercase"
                borderRadius="5px"
            >Go Back</Button>
        </Box>
    </>);
       
    }
   
    
    let weatherDetails = data.getLocWeather.consolidated_weather[0];
    

    return (
        <Flex
            h={["100%", "100%", "100vh", "100vh"]}
            w={["100vw", "100vw", "100%", "100%"]}
            flexDir={["column", "column", "row", "row", "row"]}
            overflowY="hidden"
            overflowX="hidden"
            bgColor={mainBackground}
        >
             {/* First Box */}
            <Flex
                w={["100vw", "100vw","380px","380px","380px"]}
                h={["100vh", "100vh", "100%", "100%"]}
                flexDir="column"
                alignItems="center"
                bg={colorMode === "dark" ? "#1F203A" : "#C8C2BC"} //"#C2FFF9" "#C8C2BC"
                position="relative"
                justifyContent="space-between"
            >
                <Image
                    src={Cloud}
                    alt="cloud"
                    opacity={colorMode === 'dark' ? "0.1" : "0.5"}
                    position="absolute"
                    top="70px"
                >
                </Image>
                {/* First Box Search */}
                <Flex
                    w="inherit"
                    flexDir="row"
                    alignItems="center"
                    justifyContent="space-between"
                    
                    mt={6}
                    px={6}
                >
                    <Button
                        py="2px"
                        px="18px"
                        borderRadius="2.5px"
                        variant="solid"
                        bg={colorMode === "dark" ? "grey" : "#E8E8E8"}
                        fontSize="0.8rem"
                        fontWeight="600"
                        ref={btnRef}
                        onClick={onOpen}
                    >Search for places</Button>
                    <SearchDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
                    <Circle
                        cursor="pointer"
                        size="40px"
                        p={2}
                        // bg="grey" #1F203A F1CA89 C8C2BC
                        bg={colorMode === "dark" ? "grey" : "#E8E8E8"}
                       
                        _hover={{
                            shadow: "0px 0px 10px #fff",
                        }}
                        onClick={toggleColorMode}
                    >{colorMode === "dark" ? <FaSun /> : <FaMoon />}</Circle>
                </Flex>
                {/* First Box Image */}
                
                <Flex
                    flexDir="row"
                    alignItems="center"
                    justifyContent="center"
                    mt={16}
                   
                >
                    <Image
                        src={`/${weatherDetails.weather_state_abbr}.svg`}
                        alt="shower"
                       
                        width="120px"></Image>
                </Flex>
               
                <Heading
                    mt={8}
                    w="100%"   
                    textAlign="center"
                    as="h1"
                    size="4xl"
                    zIndex="999"
                >{ Number((weatherDetails.the_temp).toFixed(1))}°C</Heading>
                <Text w="inherit" fontSize="2.1rem" textAlign="center" my={10} opacity="0.5">{weatherDetails.weather_state_name}</Text>
                <Text w="inherit" fontSize="1rem" textAlign="center" opacity="0.5">Today . {weatherDate(weatherDetails.applicable_date)}</Text>
               <Flex w="inherit" alignItems="center" justifyContent="center" opacity="0.5" textAlign="center" mt={6} mb={10}> <ImLocation /> <Text ml={3} fontSize="1rem" textTransform="uppercase">{data.getLocWeather.title}</Text></Flex>
            </Flex>
            {/* Second Box */}
            <Flex
                overflowX="hidden"
                overflowY={["hidden", "hidden","scroll"]}
                w={["100vw", "100vw", "100%", "100%","100%"]}
                h={["100%", "100%", "100vh", "100vh"]}
                flexDir="column"
                alignItems="center"
                justifyContent="space-between"
                bg={colorMode === "dark" ? "#100E1D" : "#E8E8E8"}  //#CFD8DC
               
                px={24}
               
            >
                {/* Light */}
                <Flex
                    
                    w="100%"
                    flexDir="row"
                    alignItems="center"
                    justifyContent="end"
                    mt={7}
                >
                    <Circle
                        d="flex"
                        flexDir="row"
                        justifyContent="center"
                        size="40px"
                        p={2}
                        cursor="pointer"
                        bg={colorMode === "dark" ? "#E6E7EA" : "#C8C2BC"} 
                        //bg="#E6E7EA"
                        color="#595776"
                        alignItems="center"
                        
                    >°C</Circle>
                     <Circle
                        d="flex"
                        flexDir="row"
                        justifyContent="center"
                        size="40px"
                        p={2}
                        cursor="pointer"
                        bg={colorMode === "dark" ? "#595776" : "grey"} 
                        // bg="#595776"
                        color="#E6E7EA"
                        ml={2}
                        alignItems="center"
                       
                       
                    >°F</Circle>
                </Flex>

                {/* Tomorrow */}
                <Flex
                    w={["100vw", "100vw", "100%", "100%", "100%"]}
                    flexDir={["column","column", "row","row", "row"]}
                    justifyContent="space-between"

                    alignItems="center"
                    flexWrap="wrap"
                    my={4}
                >
                    {data.getLocWeather.consolidated_weather.slice(1).map(({
                        
                        weather_state_abbr,
                       
                        applicable_date, max_temp, min_temp }) => {
                        return (
                            <Box
                                key={applicable_date}
                                bg={colorMode === "dark" ? "#1F203A" : "#C8C2BC"}
                                
                                width={["280px","280px","180px","130px","130px"]}
                                p={4}
                                m={2}
                                borderRadius={5}
                                d="flex"
                                flexDir="column"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Text fontSize={["md","md","sm", "sm"]} fontWeight="400">{moment(Date.now()).add(1, 'days').format("ddd, D MMM") === weatherDate(applicable_date) ? "Tomorrow" : weatherDate(applicable_date)}</Text>
                                <Image p={2} my={3} w={["100px","100px", "80px"]} h={["100px","100px", "80px"]} src={`/${weather_state_abbr}.svg`} alt={`${weather_state_abbr}`} />
                                <Flex w="100%" justifyContent="space-between" alignItems="center">
                                    <Text fontSize={["1.5rem","1.4rem","1rem"]} fontWeight="bold">{Number((max_temp).toFixed(0))}°C</Text>
                                    <Text fontSize={["1rem","1rem", "0.85rem"]} opacity="0.8">{Number((min_temp).toFixed(0))}°C</Text>
                                </Flex>
                            </Box>
                        );
                    }) }
                    
                </Flex>
                {/* Heading */}
                <Flex alignItems="center" my="10px" w="100%" justifyContent={["center","center","start"]}>
                    <Heading
                        m={2}
                        fontSize="2xl"
                    >Today's Highlight</Heading>
                </Flex>

                <Flex
                   
                    w="100%"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="space-between"    
                >
                    <Flex
                        w="100%"
                        alignItems="center"
                        justifyContent="space-between"
                        flexDir={["column","column", "column","row", "row"]}
                    >
                        <Box
                            bg={colorMode === "dark" ? "#1F203A" : "#C8C2BC"}
                            height="180px"
                            width={["280px","280px","280px","380px","380px"]}
                            p={4}
                            m={2}
                            borderRadius={5}
                            d="flex"
                            flexDir="column"
                            alignItems="center"
                            justifyContent="space-between"
                            
                        >
                            <Text fontSize="md">Velocity</Text>
                            <Heading as="h1" my={6} size="2xl">{ Number((weatherDetails.wind_speed).toFixed(1))}</Heading>
                            <Flex alignItems="center" justifyContent="center" w="100%" mb={1}><FaLocationArrow /></Flex>
                        </Box>
                        <Box
                            bg={colorMode === "dark" ? "#1F203A" : "#C8C2BC"}
                            height="180px"
                            width={["280px","280px","280px","380px","380px"]}
                            p={4}
                            m={2}
                            borderRadius={5}
                            d="flex"
                            flexDir="column"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Text fontSize="md">Humidity</Text>
                            <Heading as="h1" my={6} size="2xl">{weatherDetails.humidity}%</Heading>
                            <Slider aria-label="slider-ex-4" mb={1}
                                defaultValue={weatherDetails.humidity} width="200px"
                                isReadOnly="true">
                                <SliderTrack bg="red.100">
                                    <SliderFilledTrack bg="tomato" />
                                </SliderTrack>
                            </Slider>
                        </Box>
                    </Flex>
                    <Flex
                        w="100%"
                        alignItems="center"
                        justifyContent="space-between"
                        flexDir={["column","column", "column","row", "row"]}
                        mt={4}
                        mb={10}
                    >
                        <Box
                            bg={colorMode === "dark" ? "#1F203A" : "#C8C2BC"}
                            height="130px"
                            width={["280px","280px","280px","380px","380px"]}
                            p={4}
                            m={2}
                            borderRadius={5}
                            d="flex"
                            flexDir="column"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Text fontSize="md">Visibility</Text>
                            <Heading as="h1" size="2xl">{ Number((weatherDetails.visibility).toFixed(1))} miles</Heading>
                        </Box>
                        <Box
                            bg={colorMode === "dark" ? "#1F203A" : "#C8C2BC"}
                            h="130px"
                            width={["280px","280px","280px","380px","380px"]}
                            p={4}
                            m={2}
                            borderRadius={5}
                            d="flex"
                            flexDir="column"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                             <Text fontSize="md">Air Pressure</Text>
                            <Heading as="h1" size="2xl">{weatherDetails.air_pressure} mb</Heading>
                        </Box>
                    </Flex>
                    <Flex alignItems="center" textAlign="center" justifyContent="center" w="100%">
                        <Text d="flex" alignItems="center" justifyContent="center" fontSize="md" p={4} w="100%" color={colorMode === "dark" ? "#fff" : "#000"}>created by - Manjesh Hembrom</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
