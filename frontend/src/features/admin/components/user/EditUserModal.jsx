// // src/components/admin/EditUserModal.jsx
// import React, { useState } from 'react';
// import { FiX, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

// const EditUserModal = ({ user, onClose, onEdit }) => {
//   const [formData, setFormData] = useState({
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     isBlock: user.isBlock,
//   });

//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
//     if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
//     if (!formData.location.trim()) newErrors.location = 'Location is required';
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name.startsWith('preferences.')) {
//       const prefName = name.split('.')[1];
//       setFormData(prev => ({
//         ...prev,
//         preferences: {
//           ...prev.preferences,
//           [prefName]: type === 'checkbox' ? checked : value
//         }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onEdit(formData);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl w-full max-w-2xl maxh-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
//           <h2 className="text-xl font-bold text-gray-800">Edit User</h2>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
//             <FiX size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           <div className="space-y-6">
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
//                   errors.name ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.name && (
//                 <p className="mt-1 text-xs text-red-500">{errors.name}</p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address *
//               </label>
//               <div className="relative">
//                 <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
//                     errors.email ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="mt-1 text-xs text-red-500">{errors.email}</p>
//               )}
//             </div>


//             {/* Role and Status */}
//             <div className="grid grid-cols-2 gap-4">
             
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Status
//                 </label>
//                 <select
//                   name="isBlock"
//                   value={formData.isBlock}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 >
//                   <option value="active">Active</option>
//                   <option value="blocked">Blocked</option>
//                 </select>
//               </div>
//             </div>

        
//           </div>

//           {/* Form Actions */}
//           <div className="flex gap-3 mt-8 pt-6 border-t">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors"
//             >
//               Update User
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditUserModal;