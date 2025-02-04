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
import { Switch } from '@/components/ui/switch'
import { useBoundStore } from '@/store/boundStore'
import { IconButton, Text, VStack } from '@chakra-ui/react'
import { FaGear } from 'react-icons/fa6'
import { InfoTip } from './ui/toggle-tip'

const Options = () => {
  const { showHanScoring, showJapaneseYakuNames, setOptionsValue } =
    useBoundStore()

  const showOnScoringOnChange: React.ComponentProps<
    typeof Switch
  >['onCheckedChange'] = e => setOptionsValue('showHanScoring', e.checked)
  const showJapaneseYakuNamesOnChange: React.ComponentProps<
    typeof Switch
  >['onCheckedChange'] = e =>
    setOptionsValue('showJapaneseYakuNames', e.checked)

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
            <Text>Settings</Text>
          </DialogTitle>
        </DialogHeader>
        <DialogBody padding={6}>
          <VStack justifyContent="center" alignItems="center">
            <ColorModeButton />
            <Switch
              checked={showHanScoring}
              onCheckedChange={showOnScoringOnChange}
            >
              Use Han Scoring
              <InfoTip
                content={
                  <Text>A simplified scoring system that only uses han</Text>
                }
              />
            </Switch>
            <Switch
              checked={showJapaneseYakuNames}
              onCheckedChange={showJapaneseYakuNamesOnChange}
            >
              Use Japanese Yaku names
            </Switch>
          </VStack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}

export default Options
