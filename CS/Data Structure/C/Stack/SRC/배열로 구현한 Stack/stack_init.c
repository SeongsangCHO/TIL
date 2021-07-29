/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   stack_init.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/25 12:15:02 by secho             #+#    #+#             */
/*   Updated: 2020/04/25 12:32:40 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "stack.h"

t_stack	*stack_init()
{
	t_stack *stack;

	if (!(stack = malloc(sizeof(t_stack))))
		return (NULL);
	for(int i = 0; i < LEN; i++)
		stack->data[i] = 0;
	stack->top = -1;
	return (stack);
}
