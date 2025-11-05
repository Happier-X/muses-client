import { useForm } from '@tanstack/react-form'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

export default function Auth() {
  const form = useForm({
    defaultValues: {
      serverAddress: '',
      username: '',
      password: '',
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2))
    },
  })
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View className="w-[80%] gap-4 border-gray-300 rounded-md p-4">
          <Text className="text-3xl font-bold text-center leading-8">Muses</Text>
          <form.Field
            name="serverAddress"
            validators={{
              onChange: z.string().url('请输入正确的服务器地址'),
            }}
          >
            {(field) => (
              <>
                <Text>服务器地址</Text>
                <TextInput
                  className="border-2"
                  placeholder="请输入服务器地址"
                  value={field.state.value}
                  onChangeText={field.handleChange}
                />
                {!field.state.meta.isValid && (
                  <Text className="text-red-400">{field.state.meta.errors.join(', ')}</Text>
                )}
              </>
            )}
          </form.Field>
          <form.Field
            name="username"
            validators={{
              onChange: z.string().min(3, '用户名不能少于3个字符'),
            }}
          >
            {(field) => (
              <>
                <Text>用户名</Text>
                <TextInput value={field.state.value} onChangeText={field.handleChange} />
                {!field.state.meta.isValid && (
                  <Text className="text-red-400">{field.state.meta.errors.join(', ')}</Text>
                )}
              </>
            )}
          </form.Field>
          <form.Field
            name="password"
            validators={{
              onChange: z.string().min(6, '密码不能少于6个字符'),
            }}
          >
            {(field) => (
              <>
                <Text>密码</Text>
                <TextInput value={field.state.value} onChangeText={field.handleChange} />
                {!field.state.meta.isValid && (
                  <Text className="text-red-400">{field.state.meta.errors.join(', ')}</Text>
                )}
              </>
            )}
          </form.Field>
          <Pressable onPress={form.handleSubmit}>
            <Text>提交</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
