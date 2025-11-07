import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'
import authApi from '@/api/auth'
import 'expo-sqlite/localStorage/install'
import { useRouter } from 'expo-router'

export default function Auth() {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      serverAddress: globalThis.localStorage.getItem('serverAddress') || '',
      username: globalThis.localStorage.getItem('username') || '',
      password: '',
    },
    onSubmit: ({ value }) => {
      globalThis.localStorage.setItem('serverAddress', value.serverAddress)
      globalThis.localStorage.setItem('username', value.username)
      loginMutation.mutate({
        username: value.username,
        password: value.password,
      })
    },
  })
  const loginMutation = useMutation({
    mutationFn: (body: LoginBody) => authApi.login(body),
    onSuccess: (res) => {
      if (res.code == 200) {
        globalThis.localStorage.setItem('accessToken', res.data.accessToken)
        globalThis.localStorage.setItem('refreshToken', res.data.refreshToken)
        router.replace('(tabs)')
      }
    },
    onError: (err) => {
      console.error('登录失败', err)
    },
  })
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Muses</Text>
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
                  placeholder="请输入服务器地址"
                  value={field.state.value}
                  onChangeText={field.handleChange}
                />
                {!field.state.meta.isValid && <Text>{field.state.meta.errors.join(', ')}</Text>}
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
                {!field.state.meta.isValid && <Text>{field.state.meta.errors.join(', ')}</Text>}
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
                {!field.state.meta.isValid && <Text>{field.state.meta.errors.join(', ')}</Text>}
              </>
            )}
          </form.Field>
          <Button title="提交" onPress={form.handleSubmit} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '80%',
    gap: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4f9df7',
  },
})
