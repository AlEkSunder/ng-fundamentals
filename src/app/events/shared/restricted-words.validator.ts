import { FormControl } from '@angular/forms'
import { Injectable } from '@angular/core'

@Injectable()
export class RestrictedWordsValidator {

    restrictedWords(words) {
        return (control: FormControl): { [key: string]: any } => {
            if (!words) return null

            var invalidWords = words
                .map((word: string) => control.value.includes(word) ? word : null)
                .filter((word: string) => word != null)

            return invalidWords && invalidWords.length > 0
                ? { 'restrictedWords': invalidWords.join(', ') }
                : null
        }
    }
}