import { ColorModeButton } from '@/components/ui/color-mode'
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { IconButton, Text, VStack } from '@chakra-ui/react'
import { FaGear } from 'react-icons/fa6'

const Options = () => {
  return (
    <DialogRoot placement="center">
      <DialogBackdrop />
      <DialogTrigger asChild>
        <IconButton
          aria-label="Options"
          variant="surface"
          _active={{
            transform: 'scale(0.98)',
          }}
        >
          <FaGear />
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader padding={6} paddingBottom={0} textAlign="center">
          <DialogTitle>
            <Text>Hi there</Text>
          </DialogTitle>
        </DialogHeader>
        <DialogBody padding={6}>
          <VStack justifyContent="center" alignItems="center">
            <ColorModeButton />
          </VStack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}

export default Options
