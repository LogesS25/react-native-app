import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setform] = useState({
    username:'',
    email: '',
    password: ''
  })

  // since handlepress=submit takes time , we use loading
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
  if(!form.username === "" || !form.email === "" || form.password === ""){
    Alert.alert('Error', 'please fill in the fields')
  }

  setIsSubmitting(true);

  try {
    const result = await createUser(form.email,form.password,form.username)

    //set it to global state
      setUser(result);
      setIsLoggedIn(true);
    router.replace("/home");
  } catch (error) {
    Alert.alert('Error', error.message)
  }finally{
      setIsSubmitting(false);
  }
};



  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[83vh] px-4 my-6'>
          <Image
            source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign Up</Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setform({ ...form, username: e })}
            otherStyles='mt-7'
          />
          {/*second custom component */}
          <FormField
            // title is a prop here
            title="Email"
            // value needs to correspond to acutal field value, so we go for useState()
            value={form.email}
            // handle change text so we know how we modify it 
            // and it is a callback function which accepts a event 
            // and it calls the setForm setter where we destructure the existing form values
            //and then modify the email = event that we are passing
            handleChangeText={(e) => setform({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setform({ ...form, password: e })}
            otherStyles='mt-7'
          />


          <CustomButton
            title="Sign Up"
            handlePress={submit}
            ContainerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link 
            href="/sign-in"
            className="text-lg font-psemibold text-secondary">Sign-in</Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp