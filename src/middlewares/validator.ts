// import { validationPipe, IsString, IsNumber } from './validation';

// export const validationMiddleware (validationSchema) => async (req, res, next) => {
//     const result: any = await validationPipe(validationSchema, { ...req.body, ...req.params }, { pretty: false });
//       if (result.errors) {
//         console.log(result);
//         return res.status(400).json({
//           success: false,
//           ...result,
//         });
//       }

//       next();
//       return true;
// };



