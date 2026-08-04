// import React from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
// // import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Button } from "@/components/ui/button";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { paymentFormSchema, type PaymentFormValues } from "../lib/PaymentValidation";
// import { Bank, CreditCard } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const PaymentOption = () => {
//   const { toast } = useToast();
  
//   const form = useForm<PaymentFormValues>({
//     resolver: zodResolver(paymentFormSchema),
//     defaultValues: {
//       fullName: "",
//       email: "",
//       paymentMethod: undefined,
//     },
//   });

//   const onSubmit = (values: PaymentFormValues) => {
//     toast({
//       title: "Payment Details Submitted",
//       description: `Processing payment via ${values.paymentMethod === 'bank' ? 'Direct Bank Transfer' : 'Debit/Credit Card'}`,
//     });
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       <main className="flex-1 container max-w-3xl mx-auto px-4 py-8">
//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle className="text-2xl font-semibold text-center">
//               Contact Information
//             </CardTitle>
//           </CardHeader>
          
//           <CardContent>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                 {/* Contact Information */}
//                 <div className="space-y-4">
//                   <FormField
//                     control={form.control}
//                     name="fullName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Full Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Olalekan Legado" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email Address</FormLabel>
//                         <FormControl>
//                           <Input placeholder="jackson.graham@example.com" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 {/* Payment Options */}
//                 <div className="space-y-4">
//                   <h3 className="text-xl font-semibold">Payment Options</h3>
                  
//                   <FormField
//                     control={form.control}
//                     name="paymentMethod"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <RadioGroup
//                             onValueChange={field.onChange}
//                             value={field.value}
//                             className="space-y-3"
//                           >
//                             <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border p-4 hover:bg-muted/50 cursor-pointer">
//                               <FormControl>
//                                 <RadioGroupItem value="bank" />
//                               </FormControl>
//                               <Bank className="h-5 w-5 text-blue-600" />
//                               <FormLabel className="font-normal cursor-pointer">
//                                 Direct Bank Transfer
//                               </FormLabel>
//                             </FormItem>

//                             <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border p-4 hover:bg-muted/50 cursor-pointer">
//                               <FormControl>
//                                 <RadioGroupItem value="card" />
//                               </FormControl>
//                               <CreditCard className="h-5 w-5 text-blue-600" />
//                               <FormLabel className="font-normal cursor-pointer">
//                                 Debit/Credit Card
//                               </FormLabel>
//                             </FormItem>
//                           </RadioGroup>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <Button 
//                   type="submit"
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   Proceed to Payment
//                 </Button>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </main>

//       <Footer />
//     </div>
//   );
// };


