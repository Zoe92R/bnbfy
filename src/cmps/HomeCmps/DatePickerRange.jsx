// import * as React from 'react';
// import {TextField,Box} from '@material-ui/core';
// import {DateRangePicker,LocalizationProvider} from '@material-ui/lab';
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// import Box from '@material-ui/core/Box';

// export function DatePickerRange() {
//   const [value, setValue] = React.useState([null, null]);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <DateRangePicker
//         startText="Check-in"
//         endText="Check-out"
//         value={value}
//         onChange={(newValue) => {
//           setValue(newValue);
//         }}
//         renderInput={(startProps, endProps) => (
//           <React.Fragment>
//             <TextField {...startProps} />
//             <Box sx={{ mx: 2 }}> to </Box>
//             <TextField {...endProps} />
//           </React.Fragment>
//         )}
//       />
//     </LocalizationProvider>
//   );
// }