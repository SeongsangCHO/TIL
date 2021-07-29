/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   clear.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/25 12:36:06 by secho             #+#    #+#             */
/*   Updated: 2020/04/25 12:39:32 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "stack.h"

void	clear(t_stack *stack)
{
	if(stack->top == -1)
		return;
	else
	{
		while(stack->top != -1)
			pop(stack);
	}
	pop(stack);
	free(stack);
}
