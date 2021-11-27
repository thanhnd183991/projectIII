import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';
import React from 'react';

const Group = styled("div")(({theme })=> ({
    position: "absolute",
    display: "flex",
    bottom: "-20px", 
    left: "50%",
    transform: "translate(-50%, -50%)"
}))

export default function GroupDots({x, setX}) {
//     const [timeSlider, setTimeSlider] = useState(0);
//     const TIME_TRANSFER = 6000;
//     setTimeout(() => {
//        setTimeSlider(timeSlider+TIME_TRANSFER);
//        if(timeSlider > TIME_TRANSFER) {
//            setTimeSlider(0);
//            if(x === "200")
//             setX("0");
//            else{
//                const tmp = String(Number(x) + 100);
//                setX(tmp);
//            }
//            console.log(x)
//        }
//    }, 1000);
  const handleChange =  (event) => {
    setX(event.target.value);
    // setTimeSlider(0);
  };
  return (
    <Group>
      <Radio
        checked={x === '0'}
        onChange={handleChange}
        value="0"
        name="radio-buttons"
        inputProps={{ 'aria-label': '0' }}
      />
      <Radio
        checked={x === '100'}
        onChange={handleChange}
        value="100"
        name="radio-buttons"
        inputProps={{ 'aria-label': '100' }}
      />
      <Radio
        checked={x === '200'}
        onChange={handleChange}
        value="200"
        name="radio-buttons"
        inputProps={{ 'aria-label': '200' }}
      />
    </Group>
  );
}
