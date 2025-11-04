import MusesIcon from '@/components/shared/MusesIcon'
import { Text, View } from 'react-native'

type MusesCellProps = {
  icon?: string
  title: string
  value?: string
  arrow?: boolean
  isFirst?: boolean
  isLast?: boolean
}

const MusesCell: React.FC<MusesCellProps> = ({ icon, title, value, arrow, isFirst, isLast }) => {
  return (
    <View
      className={`flex-row items-center justify-between bg-white p-4 ${isFirst ? 'rounded-t-lg' : ''} ${isLast ? 'rounded-b-lg' : ''}`}
    >
      <>
        {icon && <MusesIcon name={icon} />}
        <Text>{title}</Text>
      </>
      <>
        {value && <Text className="ml-auto text-right text-gray-500">{value}</Text>}
        {arrow && <MusesIcon name="right_line" color="gray" />}
      </>
    </View>
  )
}

export default MusesCell
