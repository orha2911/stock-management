// import React, { useState } from 'react';
// import { Form, Input, Button, message } from 'antd';
// import { addStock } from './apiService'; // Your API service

// const AddStockForm = ({ userId, refreshPortfolio }) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       await addStock(userId, values); // Add stock to the portfolio
//       message.success('Stock added successfully!');
//       form.resetFields(); // Reset form fields
//       refreshPortfolio(); // Refresh the portfolio list
//     } catch (error) {
//       message.error('Failed to add stock.');
//     }
//     setLoading(false);
//   };

//   return (
//     <Form form={form} onFinish={handleSubmit}>
//       <Form.Item
//         name="symbol"
//         label="Stock Symbol"
//         rules={[{ required: true, message: 'Please input the stock symbol!' }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         name="quantity"
//         label="Quantity"
//         rules={[{ required: true, message: 'Please input the quantity!' }]}
//       >
//         <Input type="number" />
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit" loading={loading}>
//           Add Stock
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default AddStockForm;
